import constant
import stock_list
import stock_list_hist
import stock_list_income
import stock_list_market
import stock_list_partner

print("start...")
# 1.先获取股票列表 -> stock-list.json
# stock_list.update_stock_list()

# 2.依据stock-list.json 已有的股票列表, 更新股票历史行情数据 -> stock-list-hist.json
# 参数: 时间范围
stock_list_hist.update_stock_list_hist(constant.HIST_DIFF_DAY)

# 3.获取股票业绩报表(营收/利润) -> stock-list-income.json
# 参数: 业绩报告时间点 date="20241231"; choice of {"XXXX0331", "XXXX0630", "XXXX0930", "XXXX1231"}; 从 20100331 开始
# stock_list_income.update_stock_list_income(constant.INCOME_YEAR_PERIOD_DATE)

# 4.根据实时行情, 获取市值/流通市值 -> stock-list-market.json
# stock_list_market.update_stock_list_market()

# 5.获取股东人数 -> stock-list-partner.json
# 参数: 股东人数时间点
# stock_list_partner.update_stock_list_partner(constant.PARTNER_RECENT_PERIOD_DATE)

print("end!!!")

# import time
# import akshare as ak
# import pandas as pd
# import json
# from datetime import date, datetime, timedelta

# with open("./datas/stock-list.json", "r", encoding="utf-8") as stock_list_json_file:
#     stock_list_json = json.load(stock_list_json_file)

# DIFF_DAY = -14
# end_date = date.today().strftime("%Y%m%d")
# start_date = (datetime.now() + timedelta(days=DIFF_DAY)).strftime("%Y%m%d")

# print(start_date, end_date)

# stock_list_info = []
# for item in stock_list_json:
#     print(item)
#     stock_zh_a_hist_df = ak.stock_zh_a_hist(
#         symbol=item["code"],
#         period="daily",
#         start_date=start_date,
#         end_date=end_date,
#         adjust="qfq",
#     )
#     stock_zh_a_hist_json_str = stock_zh_a_hist_df.to_json(
#         orient="records", force_ascii=False
#     )
#     stock_zh_a_hist_json = json.loads(stock_zh_a_hist_json_str)
#     item["hist"] = stock_zh_a_hist_json
#     stock_list_info.append(item)

# # print(stock_list_info)

# with open("./datas/stock-list-hist.json", "w") as f:
#     json.dump(stock_list_info, f, ensure_ascii=False)
#     print("写入文件完成...")

# stock_info_a_code_name_df = ak.stock_info_a_code_name()
# stock_info_a_code_name_df.to_json(
#     "./datas/stock-list.json", orient="records", force_ascii=False
# )
# stock_zh_a_hist_df = ak.stock_zh_a_hist(symbol="688378", period="daily", start_date="20250101", end_date='20250117', adjust="qfq")
# stock_zh_a_hist_json_str = stock_zh_a_hist_df.to_json(orient = 'records',  force_ascii=False)
# stock_zh_a_hist_json = json.loads(stock_zh_a_hist_json_str)
# print(stock_zh_a_hist_json)
# print(type(stock_zh_a_hist_json))

# print(type(stock_info_a_code_name_df))

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
