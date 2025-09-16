from bs4 import BeautifulSoup
import pandas as pd
import requests
import time
from io import StringIO


all_teams = []

html = requests.get('https://fbref.com/en/comps/9/Premier-League-Stats').text
soup = BeautifulSoup(html, 'lxml')
table = soup.find_all('table', class_='stats_table')[0]

links = [l.get("href") for l in table.find_all('a') if '/squads/' in l.get("href")]
team_urls = [f"https://fbref.com{l}" for l in links]

for team_url in team_urls: 
    team_name = team_url.split("/")[-1].replace("-Stats", "")
    data = requests.get(team_url).text
    soup = BeautifulSoup(data, 'lxml')
    stats = soup.find_all('table', class_="stats_table")[0]

    # ✅ FIXED: wrap with StringIO
    team_data = pd.read_html(StringIO(str(stats)))[0]

    if isinstance(team_data.columns, pd.MultiIndex):
        team_data.columns = team_data.columns.droplevel()

    team_data["Team"] = team_name
    all_teams.append(team_data)
    time.sleep(5)

stat_df = pd.concat(all_teams, ignore_index=True)
stat_df.to_csv("stats.csv", index=False)
print("✅ Stats saved to stats.csv")
