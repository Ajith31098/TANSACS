

def adiec_exp_score(instance):
    all_exp = instance.exp.all()
    score = 0

    for each_exp in all_exp:
        total += each_exp.year

    score = total * 7

    return 20 if score >= 20 else score
