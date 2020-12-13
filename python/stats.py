import json
import pandas as pd
from datetime import datetime


def cal_last(r):
    # print(r)
    try:
        if (r["Extinguished"]!=None):
            start = datetime.strptime(r["Started"], '%Y-%m-%dT%H:%M:%SZ')
            end = datetime.strptime(r["Extinguished"], '%Y-%m-%dT%H:%M:%SZ')
            return end-start
    except:
        print(r["Started"], r["Extinguished"])


with open('ca_wildfire.json', 'r', encoding="utf-8") as f:
    data = json.load(f)

df = pd.DataFrame(data)

df_no_loc = df[df['Latitude'] == 0]
df['last_time'] = df.apply(lambda row: cal_last(row), axis=1)

# print(len(df_no_loc))
# print(df_no_loc)

# print(df["AcresBurned"].max())
# print(df["AcresBurned"].median())
# print(df["AcresBurned"].mean())
# print(df.iloc[df["last_time"].argmax(),]["Started"])
# print(df["last_time"].max())

res = df.to_json(orient="records")
data=json.loads(res)

# last_time unit: ms
with open('ca_wildfire_clean.json', 'w', encoding="utf-8") as outfile:
    json.dump(data, outfile, sort_keys=True, indent=4,
                                separators=(',', ':'), ensure_ascii=False)

