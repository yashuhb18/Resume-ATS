import httpx
from bs4 import BeautifulSoup
from typing import List, Dict, Any
import datetime
import os
import json
import re
import urllib.parse

class IndustryNewsService:
    """Scrapes engineering news with high-resolution visuals from multiple premium sources."""
    
    def __init__(self):
        self.cache_file = os.path.join(os.path.dirname(__file__), "news_cache.json")
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9"
        }

    def get_latest_news(self) -> Dict[str, Any]:
        """Fetch latest news from cache or scrape both sources if cache is expired (>24h)."""
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, "r") as f:
                    cache_data = json.load(f)
                
                last_updated = datetime.datetime.fromisoformat(cache_data["last_updated"])
                if datetime.datetime.now() - last_updated < datetime.timedelta(hours=24):
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

        # Remove duplicates by title and limit to 20 items
        seen_titles = set()
        unique_news = []
        for item in all_news:
            clean_title = item['title'].lower().strip()
            if clean_title not in seen_titles:
                seen_titles.add(clean_title)
                unique_news.append(item)

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
        """Scrapes interestingengineering.com with advanced image clarity logic."""
        try:
            url = "https://interestingengineering.com/news"
            response = httpx.get(url, headers=self.headers, follow_redirects=True, timeout=15.0)
            soup = BeautifulSoup(response.text, 'html.parser')
            news_items = []
            
            # Find all potential article containers
            articles = soup.find_all('article')
            if not articles:
                # Fallback to general grid items
                articles = soup.select('div[class*="flex-col"]')
            
            for article in articles:
                if len(news_items) >= 10: break
                
                title_tag = article.find('h3') or article.find('h2') or article.find('h4')
                link_tag = article.find('a')
                img_tag = article.find('img')
                
                # If title is not in h tags, it might be in the a tag itself
                if not title_tag and link_tag:
                    title_text = link_tag.get_text(strip=True)
                    if len(title_text) > 20: # Likely a title
                        title = title_text
                    else: continue
                elif title_tag:
                    title = title_tag.get_text(strip=True)
                else: continue

                if link_tag and link_tag.has_attr('href'):
                    link = link_tag['href']
                    if not link.startswith('http'):
                        link = "https://interestingengineering.com" + link
                    
                    if "/author/" in link or "/tags/" in link or "subscription" in link: continue
                    
                    img_src = ""
                    if img_tag:
                        # CLARITY BOOST: Extract highest quality from srcset or data-src
                        srcset = img_tag.get('srcset') or img_tag.get('data-srcset')
                        if srcset:
                            # Usually srcset is "url 380w, url 760w, url 1200w"
                            parts = [p.strip() for p in srcset.split(',')]
                            # Get the last part (highest resolution)
                            img_src = parts[-1].split(' ')[0]
                        else:
                            img_src = img_tag.get('data-src') or img_tag.get('src')
                        
                        if img_src:
                            if not img_src.startswith('http'):
                                img_src = "https://interestingengineering.com" + img_src
                            
                            # Next.js Image bypass for raw resolution
                            if "_next/image" in img_src:
                                match = re.search(r'url=([^&]+)', img_src)
                                if match:
                                    img_src = urllib.parse.unquote(match.group(1))
                                else:
                                    # Force maximum width and quality
                                    img_src = re.sub(r'w=\d+', 'w=1920', img_src)
                                    img_src = re.sub(r'q=\d+', 'q=90', img_src)

                    if not img_src:
                        img_src = "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2000"

                    category_tag = article.select_one('span[class*="category"]') or article.find('span')
                    category = category_tag.get_text(strip=True) if category_tag else "Innovation"

                    news_items.append({
                        "title": title,
                        "link": link,
                        "image": img_src,
                        "category": category,
                        "date": "IE Field Intel"
                    })
            return news_items
        except Exception as e:
            print(f"DEBUG: IE Scrape Error: {e}")
            return []

    def _scrape_engineer_live(self) -> List[Dict[str, str]]:
        """Scrapes engineerlive.com with resolution restoration."""
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
                        img_src = img_tag.get('src') or img_tag.get('data-src') or img_tag.get('srcset')
                        if img_src:
                            if " " in img_src: img_src = img_src.split(" ")[0]
                            if not img_src.startswith('http'):
                                img_src = "https://www.engineerlive.com" + (img_src if img_src.startswith('/') else '/' + img_src)
                            
                            # IMAGE CLARITY: Bypass Drupal styles and clean suffixes
                            if '/styles/' in img_src:
                                parts = img_src.split('/public/')
                                if len(parts) > 1:
                                    img_src = f"https://www.engineerlive.com/sites/engineerlive/files/{parts[1]}"
                                else:
                                    img_src = img_src.replace('/styles/card/', '/styles/large/')
                            
                            # Remove Pagespeed/Token parameters that degrade quality
                            img_src = img_src.split(',qitok=')[0].split('.pagespeed.')[0]
                    
                    if not img_src:
                        img_src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000"

                    category_tag = article.select_one('.field--name-field-category') or article.select_one('.category')
                    category = category_tag.get_text(strip=True) if category_tag else "Industry"

                    news_items.append({
                        "title": title,
                        "link": link,
                        "image": img_src,
                        "category": category,
                        "date": "Global Market"
                    })
            return news_items
        except Exception as e:
            print(f"DEBUG: EL Scrape Error: {e}")
            return []

industry_news_service = IndustryNewsService()
