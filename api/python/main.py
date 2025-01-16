# from typing import Union
# import tushare as ts
# import akshare as ak

import time
import akshare as ak
import pandas as pd


stock_info_a_code_name_df = ak.stock_info_a_code_name()
stock_info_a_code_name_df.to_json('./datas/stock-list.json', orient = 'records')
print(type(stock_info_a_code_name_df))

# stock_codes = ak.stock_zh_a_spot_em()['代码']

# data_frames = []
# count = 0
# for stock_code in stock_codes:
#     try:
#         stock_data = ak.stock_zh_a_hist(
#             symbol=stock_code, period="daily", start_date="20240605", end_date='20240607', adjust="hfq")
#         data_frames.append(stock_data)
#     except Exception as e:
#         print(f"Error fetching data for {stock_code}: {e}")
#     if count % 10 == 0:
#         time.sleep(0.5)
#     count += 1
# # 合并所有股票数据
# all_stock_data = pd.concat(data_frames)
# all_stock_data.to_csv('./stockdata.csv', sep=',', index=False)

# stock_sse_summary_df = ak.stock_sse_summary()
# print(stock_sse_summary_df)

# stock_info_a_code_name_df = ak.stock_info_a_code_name()
# print(stock_info_a_code_name_df)
# from fastapi import FastAPI

# app = FastAPI()
# print(ts.__version__)
# ts.get_stock_basics()

# @app.get("/")
# def read_root():
#     ts.get_stock_basics()
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}
