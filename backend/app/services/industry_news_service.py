import httpx
from bs4 import BeautifulSoup
from typing import List, Dict, Any
import datetime
import os
import json

class IndustryNewsService:
    """Scrapes engineering news from engineerlive.com and caches it for 24 hours."""
    
    def __init__(self):
        self.url = "https://www.engineerlive.com/"
        self.cache_file = os.path.join(os.path.dirname(__file__), "news_cache.json")
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }

    def get_latest_news(self) -> Dict[str, Any]:
        """Fetch latest news from cache or scrape if cache is expired (>24h)."""
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, "r") as f:
                    cache_data = json.load(f)
                
                last_updated = datetime.datetime.fromisoformat(cache_data["last_updated"])
                if datetime.datetime.now() - last_updated < datetime.timedelta(hours=24):
                    print("DEBUG: Returning cached news")
                    return cache_data
            except Exception as e:
                print(f"DEBUG: Cache error: {e}")

        # Scrape if no cache or expired
        print("DEBUG: Scraping fresh news from engineerlive.com")
        news_items = self._scrape_news()
        
        result = {
            "news": news_items,
            "last_updated": datetime.datetime.now().isoformat()
        }
        
        # Save to cache
        try:
            with open(self.cache_file, "w") as f:
                json.dump(result, f)
        except Exception as e:
            print(f"DEBUG: Failed to save cache: {e}")
            
        return result

    def _scrape_news(self) -> List[Dict[str, str]]:
        """Perform the actual scraping."""
        try:
            response = httpx.get(self.url, headers=self.headers, follow_redirects=True, timeout=10.0)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            news_items = []
            
            # The site uses views-row or article tags
            articles = soup.find_all('article')
            if not articles:
                articles = soup.select('.views-row') or soup.select('.node--type-article')
            
            for article in articles:
                try:
                    if len(news_items) >= 12: 
                        break
                        
                    title_tag = article.find('h3') or article.find('h2') or article.find('h4')
                    link_tag = article.find('a')
                    
                    if not title_tag or not link_tag or not link_tag.has_attr('href'):
                        continue

                    title = title_tag.get_text(strip=True)
                    link = link_tag['href']
                    
                    if not link.startswith('http'):
                        link = "https://www.engineerlive.com" + (link if link.startswith('/') else '/' + link)
                    
                    if "/content/" not in link and "/news/" not in link and "/articles/" not in link:
                        continue
                        
                    img_tag = article.find('img')
                    img_src = ""
                    if img_tag:
                        img_src = img_tag.get('src') or img_tag.get('data-src') or img_tag.get('srcset')
                        if img_src:
                            if " " in img_src: 
                                img_src = img_src.split(" ")[0]
                            if not img_src.startswith('http'):
                                img_src = "https://www.engineerlive.com" + (img_src if img_src.startswith('/') else '/' + img_src)
                    
                    if not img_src:
                        img_src = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000"

                    category_tag = article.select_one('.field--name-field-category') or article.select_one('.category')
                    category = category_tag.get_text(strip=True) if category_tag else "Engineering"

                    news_items.append({
                        "title": title,
                        "link": link,
                        "image": img_src,
                        "category": category,
                        "date": "Today"
                    })
                except Exception as inner_e:
                    print(f"DEBUG: Skipping one article due to error: {inner_e}")
                    continue
                    
            return news_items
        except Exception as e:
            print(f"DEBUG: Scraping failed critically: {e}")
            import traceback
            traceback.print_exc()
            return []

industry_news_service = IndustryNewsService()
