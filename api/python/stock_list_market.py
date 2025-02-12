# 根据实时行情, 获取市值/流通市值
import os
import akshare as ak
import json


def update_stock_list_market():
    print("stock-list-market.json 开始更新...")
    cur_path = os.path.abspath(os.path.dirname(__file__))
    file_path = os.path.join(cur_path, "datas/stock-list-market.json")
    stock_zh_a_spot_em_df = ak.stock_zh_a_spot_em()

    stock_zh_a_spot_em_df_json_str = stock_zh_a_spot_em_df.to_json(
        orient="records", force_ascii=False
    )

    stock_zh_a_spot_em_df_json = json.loads(stock_zh_a_spot_em_df_json_str)

    with open(file_path, "w") as f:
        json.dump(stock_zh_a_spot_em_df_json, f, ensure_ascii=False)
        print("stock-list-market.json 更新股票数量: ", len(stock_zh_a_spot_em_df_json))
        print("stock-list-market.json 完成!!!")
