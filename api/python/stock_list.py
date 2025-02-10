# 获取股票列表
import akshare as ak
import os
import json


def update_stock_list():
    print("stock-list.json 开始更新...")
    cur_path = os.path.abspath(os.path.dirname(__file__))
    file_path = os.path.join(cur_path, "datas/stock-list.json")

    with open(file_path, "r", encoding="utf-8") as stock_list_json_file:
        stock_list_json = json.load(stock_list_json_file)
        print("stock-list.json 当前股票数量: ", len(stock_list_json))

    stock_info_a_code_name_df = ak.stock_info_a_code_name()
    # stock_info_a_code_name_df.to_json(file_path, orient="records", force_ascii=False)
    # print("stock-list.json 完成!!!")

    stock_info_a_code_name_json_str = stock_info_a_code_name_df.to_json(
        orient="records", force_ascii=False
    )
    stock_info_a_code_name_json = json.loads(stock_info_a_code_name_json_str)

    with open(file_path, "w") as f:
        json.dump(stock_info_a_code_name_json, f, ensure_ascii=False)
        print("stock-list.json 更新股票数量: ", len(stock_info_a_code_name_json))
        print("stock-list.json 完成!!!")
