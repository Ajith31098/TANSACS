

# ddsi_degree = {


#     5: {'exp': ['Public Health in surveillance', 'research/ M&E / epidemiology', 'MS office package and SPSS', 'epidemiological analysis', 'biostatistics']},
# }


def ddsi_exp_score(instance):
    # all_exp = instance.exp.filter(degree__in=ddsi_degree[5]['exp'])
    score = 0

    # if all_exp.exists():

    total = 0
    for each_exp in instance.exp.all():
        total += each_exp.year

    score = total * 4

    return 20 if score >= 20 else score


def get_score_ddsi(ug, pg):

    if pg > 0:
        return pg * 4

    return 0
