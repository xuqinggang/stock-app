# 获取股票股东人数信息
import akshare as ak
import json
import constant


def update_stock_list_partner(period_date=constant.PARTNER_RECENT_PERIOD_DATE):
    print("stock-list-partner.json 开始更新...", period_date)
    stock_hold_num_cninfo_df = ak.stock_hold_num_cninfo(date=period_date)

    stock_hold_num_cninfo_json_str = stock_hold_num_cninfo_df.to_json(
        orient="records", force_ascii=False
    )

    stock_hold_num_cninfo_json = json.loads(stock_hold_num_cninfo_json_str)

    with open("./datas/stock-list-partner.json", "w") as f:
        json.dump(stock_hold_num_cninfo_json, f, ensure_ascii=False)
        print("stock-list-partner.json 更新股票数量: ", len(stock_hold_num_cninfo_json))
        print("stock-list-partner.json 完成!!!")
