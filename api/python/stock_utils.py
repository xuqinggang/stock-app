import sys, time


# 定义一个进度条
def process_bar(num, total):
    rate = float(num) / total
    ratenum = int(100 * rate)
    r = "\r[{}{}]{}%".format("*" * ratenum, " " * (100 - ratenum), ratenum)
    sys.stdout.write(r)
    sys.stdout.flush()


def dict_find_item(items, target_item, target_key):
    for item in items:
        if item[target_key] == target_item[target_key]:
            return item
    return None
