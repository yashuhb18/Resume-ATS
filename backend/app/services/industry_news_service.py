import httpx
from bs4 import BeautifulSoup
from typing import List, Dict, Any
import datetime
import os
import json
import re
import urllib.parse

class IndustryNewsService:
    """Scrapes engineering news using original source photos to ensure reliability."""
    
    def __init__(self):
        self.cache_file = os.path.join(os.path.dirname(__file__), "news_cache.json")
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        }

    def get_latest_news(self) -> Dict[str, Any]:
        """Fetch latest news from cache or scrape sources if cache is expired (>24h)."""
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, "r") as f:
                    cache_data = json.load(f)
                
                last_updated = datetime.datetime.fromisoformat(cache_data["last_updated"])
                if datetime.datetime.now() - last_updated < datetime.timedelta(hours=24) and cache_data.get("news"):
                    return cache_data
            except Exception as e:
                print(f"DEBUG: Cache error: {e}")

        all_news = []
        
        # Source 1: Interesting Engineering (Primary)
        try:
            all_news.extend(self._scrape_interesting_engineering())
        except Exception as e:
            print(f"DEBUG: IE Scrape Failed: {e}")

        # Source 2: Engineer Live (Secondary)
        try:
            all_news.extend(self._scrape_engineer_live())
        except Exception as e:
            print(f"DEBUG: EL Scrape Failed: {e}")

        # Deduplication
        seen_titles = set()
        unique_news = []
        for item in all_news:
            clean_title = item['title'].lower().strip()
            if clean_title not in seen_titles and len(item['title']) > 15:
                seen_titles.add(clean_title)
                unique_news.append(item)

        if not unique_news:
            unique_news = [
                {
                    "title": "Future of Engineering: Global Shifts in Technology",
                    "link": "https://interestingengineering.com/news",
                    "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
                    "category": "Engineering",
                    "date": "Field Intel"
                }
            ]

        result = {
            "news": unique_news[:20],
            "last_updated": datetime.datetime.now().isoformat()
        }
        
        try:
            with open(self.cache_file, "w") as f:
                json.dump(result, f)
        except Exception as e:
            print(f"DEBUG: Failed to save cache: {e}")
            
        return result

    def _scrape_interesting_engineering(self) -> List[Dict[str, str]]:
        """Scrapes interestingengineering.com using original image sources."""
        try:
            url = "https://interestingengineering.com/news"
            response = httpx.get(url, headers=self.headers, follow_redirects=True, timeout=15.0)
            soup = BeautifulSoup(response.text, 'html.parser')
            news_items = []
            
            articles = soup.find_all('article') or soup.select('div[class*="flex-col"]')
            
            for article in articles:
                if len(news_items) >= 12: break
                
                title_tag = article.find('h3') or article.find('h2') or article.find('h4')
                link_tag = article.find('a')
                img_tag = article.find('img')
                
                if not link_tag or not link_tag.has_attr('href'): continue
                
                title = title_tag.get_text(strip=True) if title_tag else link_tag.get_text(strip=True)
                if len(title) < 15: continue

                link = link_tag['href']
                if not link.startswith('http'):
                    link = "https://interestingengineering.com" + link
                
                if "/author/" in link or "/tags/" in link: continue
                
                img_src = ""
                if img_tag:
                    # USE ORIGINAL SRC - No more clarity boosting which breaks URLs
                    img_src = img_tag.get('src') or img_tag.get('data-src') or img_tag.get('srcset')
                    if img_src and "," in img_src:
                        img_src = img_src.split(',')[0].strip().split(' ')[0]
                    
                    if img_src and not img_src.startswith('http'):
                        img_src = "https://interestingengineering.com" + img_src

                if not img_src:
                    img_src = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200"

                news_items.append({
                    "title": title,
                    "link": link,
                    "image": img_src,
                    "category": "Innovation",
                    "date": "Field Intel"
                })
            return news_items
        except Exception as e:
            print(f"DEBUG: IE Scrape Error: {e}")
            return []

    def _scrape_engineer_live(self) -> List[Dict[str, str]]:
        """Scrapes engineerlive.com using original image sources."""
        try:
            url = "https://www.engineerlive.com/"
            response = httpx.get(url, headers=self.headers, follow_redirects=True, timeout=15.0)
            soup = BeautifulSoup(response.text, 'html.parser')
            news_items = []
            
            articles = soup.find_all('article') or soup.select('.views-row')
            
            for article in articles:
                if len(news_items) >= 10: break
                    
                title_tag = article.find('h3') or article.find('h2')
                link_tag = article.find('a')
                
                if title_tag and link_tag and link_tag.has_attr('href'):
                    title = title_tag.get_text(strip=True)
                    link = link_tag['href']
                    if not link.startswith('http'):
                        link = "https://www.engineerlive.com" + (link if link.startswith('/') else '/' + link)
                    
                    if "/content/" not in link and "/news/" not in link: continue
                        
                    img_tag = article.find('img')
                    img_src = ""
                    if img_tag:
                        # USE ORIGINAL SRC - No more clarity boosting which breaks URLs
                        img_src = img_tag.get('src') or img_tag.get('data-src') or img_tag.get('srcset')
                        if img_src:
                            if "," in img_src:
                                img_src = img_src.split(',')[0].strip().split(' ')[0]
                            elif " " in img_src:
                                img_src = img_src.split(' ')[0]

                            if not img_src.startswith('http'):
                                img_src = "https://www.engineerlive.com" + (img_src if img_src.startswith('/') else '/' + img_src)
                    
                    if not img_src:
                        img_src = "https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&q=80&w=1200"

                    news_items.append({
                        "title": title,
                        "link": link,
                        "image": img_src,
                        "category": "Industry",
                        "date": "Global Market"
                    })
            return news_items
        except Exception as e:
            print(f"DEBUG: EL Scrape Error: {e}")
            return []

industry_news_service = IndustryNewsService()
