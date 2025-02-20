import akshare as ak

print("test")
try:
    stock_zh_a_hist_df = ak.stock_zh_a_hist(
        symbol="300114",
        period="daily",
        start_date="20170301",
        end_date="20240528",
        adjust="qfq",
    )
except Exception as e:
    print(e)
print("test")
