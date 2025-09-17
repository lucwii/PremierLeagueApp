import pandas as pd
from bs4 import BeautifulSoup
import requests
import time
from io import StringIO

# Lista kolona koje želimo da zadržimo (tačno onako kako su navedene u bazi)
desired_columns = [
    'name', 'age', 'ast', 'crdr', 'crdy', 'gls', 
    'min', 'mp', 'nation', 'pk', 'pos', 'starts', 
    'team', 'xag', 'xg'
]

all_players = []

# URL za Premier League stats
html = requests.get('https://fbref.com/en/comps/9/Premier-League-Stats').text
soup = BeautifulSoup(html, 'lxml')
table = soup.find_all('table', class_='stats_table')[0]

# Linkovi do timskih stranica
links = [l.get("href") for l in table.find_all('a') if '/squads/' in l.get("href")]
team_urls = [f"https://fbref.com{l}" for l in links]

for team_url in team_urls:
    team_name = team_url.split("/")[-1].replace("-Stats", "")
    data = requests.get(team_url).text
    soup = BeautifulSoup(data, 'lxml')

    # Uzimamo prvu tabelu sa player stats
    stats = soup.find_all('table', class_="stats_table")[0]
    team_data = pd.read_html(StringIO(str(stats)))[0]

    # Ako ima MultiIndex kolone, očistimo ih
    if isinstance(team_data.columns, pd.MultiIndex):
        team_data.columns = team_data.columns.droplevel()

    # Preimenujemo kolone
    clean = team_data.rename(columns={
        "Player": "name",
        "Nation": "nation",
        "Pos": "pos",
        "Age": "age",
        "MP": "mp",
        "Starts": "starts",
        "Min": "min",
        "Gls": "gls",
        "Ast": "ast",
        "PK": "pk",
        "CrdY": "crdy",
        "CrdR": "crdr",
        "xG": "xg",
        "xAG": "xag"
    })

    # Dodamo team kolonu
    clean["team"] = team_name

    # Proverimo koje kolone postoje u podacima
    available_columns = [col for col in desired_columns if col in clean.columns]
    
    # Zadržimo samo kolone koje postoje u podacima i želimo u izlazu
    clean = clean[available_columns]
    
    # Dodajemo nedostajuće kolone sa None vrednostima
    for col in desired_columns:
        if col not in clean.columns:
            clean[col] = None

    # Vraćamo kolone u tačnom redosledu koji je naveden
    clean = clean[desired_columns]

    all_players.append(clean)

    time.sleep(5)  # da ne preopteretimo server

# Spajamo sve u jedan dataframe
stat_df = pd.concat(all_players, ignore_index=True)

# Čuvamo u CSV sa istim redosledom kolona kao u bazi
stat_df.to_csv("stats_clean.csv", index=False)

print("✅ CSV fajl 'stats_clean.csv' kreiran sa kolonama identičnim kao u bazi.")
print(f"Kolone u izlaznom fajlu: {list(stat_df.columns)}")