# 股票添加历史行情数据
# https://akshare.akfamily.xyz/data/stock/stock.html#id1
# http://tushare.org/trading.html#id2

# from typing import Union
# import tushare as ts
# import akshare as ak
# 股票14天行情
# 日期	object	交易日
# 股票代码	object	不带市场标识的股票代码
# 开盘	float64	开盘价
# 收盘	float64	收盘价
# 最高	float64	最高价
# 最低	float64	最低价
# 成交量	int64	注意单位: 手
# 成交额	float64	注意单位: 元
# 振幅	float64	注意单位: %
# 涨跌幅	float64	注意单位: %
# 涨跌额	float64	注意单位: 元
# 换手率	float64	注意单位: %

import time
import os
import akshare as ak
import pandas as pd
import json
import constant
import stock_utils
from datetime import date, datetime, timedelta


def update_stock_list_hist(diff_day=constant.HIST_DIFF_DAY):
    print("stock-list-hist.json 开始更新...", "N天前:", diff_day)
    cur_path = os.path.abspath(os.path.dirname(__file__))

    stock_list_file_path = os.path.join(cur_path, "datas/stock-list.json")

    stock_list_hist_file_path = os.path.join(cur_path, "datas/stock-list-hist.json")

    with open(stock_list_file_path, "r", encoding="utf-8") as stock_list_json_file:
        stock_list_json = json.load(stock_list_json_file)

    # 当前
    with open(stock_list_hist_file_path, "r", encoding="utf-8") as stock_list_hist_file:
        stock_list_hist_json = json.load(stock_list_hist_file)
    print("stock-list.json 更新前原股票数量:", len(stock_list_json))

    stockLen = len(stock_list_json)
    # 最近 N 天
    DIFF_DAY = diff_day
    end_date = date.today().strftime("%Y%m%d")
    start_date = (datetime.now() + timedelta(days=DIFF_DAY)).strftime("%Y%m%d")

    time.sleep(2)
    print("更新历史行情时间范围:", start_date, end_date)

    # 待追加hist股票列表
    stock_list_info = []
    for index, item in enumerate(stock_list_json):
        # for index, item in enumerate(stock_list_json[3830:3831]):
        try:
            time.sleep(2)
            # print("股票:", item["name"], index)
            start_date = (datetime.now() + timedelta(days=DIFF_DAY)).strftime("%Y%m%d")
            target_stock_hist = None
            # 从原hist数组中找到目标股票
            target_stock_hist_item = stock_utils.dict_find_item(
                stock_list_hist_json, item, "code"
            )
            if not target_stock_hist_item is None:
                target_stock_hist = target_stock_hist_item["hist"]
                # TODO: 数据有杂质, 修复下
                target_stock_hist = target_stock_hist[0:-4]
                if not target_stock_hist is None and isinstance(
                    target_stock_hist, list
                ):
                    last_hist_item = target_stock_hist[-1]

                    if not last_hist_item is None:
                        start_date = last_hist_item["日期"]
                        # 毫秒->秒 --> 格式化时间 (加一天的)
                        start_date = (
                            datetime.fromtimestamp(start_date / 1000)
                            + timedelta(days=1)
                        ).strftime("%Y%m%d")
            if start_date > end_date:
                continue

            # print("请求时间范围:", item["name"], start_date, end_date)
            # 获取股票历史行情信息
            stock_zh_a_hist_df = ak.stock_zh_a_hist(
                symbol=item["code"],
                period="daily",
                start_date=start_date,
                end_date=end_date,
                adjust="qfq",
            )
            stock_zh_a_hist_json_str = stock_zh_a_hist_df.to_json(
                orient="records", force_ascii=False
            )
            stock_zh_a_hist_json = json.loads(stock_zh_a_hist_json_str)
            # 股票添加历史行情数组
            if isinstance(target_stock_hist, list):
                target_stock_hist.extend(stock_zh_a_hist_json)
                stock_zh_a_hist_json = target_stock_hist

            item["hist"] = stock_zh_a_hist_json
            stock_list_info.append(item)
        except Exception as e:
            print(item["name"], e)
        stock_utils.process_bar(index + 1, stockLen)

    with open(stock_list_hist_file_path, "w") as f:
        json.dump(stock_list_info, f, ensure_ascii=False)
        print("stock-list-hist.json 更新股票数量: ", len(stock_list_info))
        print("stock-list-hist.json 完成!!!")
