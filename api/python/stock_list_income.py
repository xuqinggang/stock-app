# 业绩报表 获取营收/利润
import akshare as ak
import json
import constant


# date="20200331"; choice of {"XXXX0331", "XXXX0630", "XXXX0930", "XXXX1231"}; 从 20100331 开始
def update_stock_list_income(period_date=constant.INCOME_YEAR_PERIOD_DATE):
    print("stock-list-income.json 开始更新...", period_date)
    stock_yjbb_em_df = ak.stock_yjbb_em(date=period_date)

    stock_yjbb_em_df_json_str = stock_yjbb_em_df.to_json(
        orient="records", force_ascii=False
    )

    stock_yjbb_em_df_json = json.loads(stock_yjbb_em_df_json_str)

    with open("./datas/stock-list-income.json", "w") as f:
        json.dump(stock_yjbb_em_df_json, f, ensure_ascii=False)
        print("stock-list-income.json 更新股票数量: ", len(stock_yjbb_em_df_json))
        print("stock-list-income.json 完成!!!")
