import akshare as ak
import time
from datetime import date, datetime, timedelta

target_stock_hist_item = None
target_stock_hist = target_stock_hist_item["hist"]
print(target_stock_hist)
# start_date = 1744243200
# # print(timedelta(days=1))
# start_date = (datetime.fromtimestamp(1744243200) + timedelta(days=1)).strftime("%Y%m%d")
# print(start_date)
# start_date = time.strftime(
#     "%Y%m%d", datetime.localtime(start_date / 1000) + timedelta(days=1)
# )
# print(start_date)
# print("test")
# try:
#     stock_zh_a_hist_df = ak.stock_zh_a_hist(
#         symbol="300114",
#         period="daily",
#         start_date="20170301",
#         end_date="20240528",
#         adjust="qfq",
#     )
# except Exception as e:
#     print(e)
# print("test")
