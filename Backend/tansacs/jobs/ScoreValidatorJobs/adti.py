

adti_degree = {


    'pg': ['Master of Science (M.Sc.)', 'Master of Surgery (M.S.)', 'Master of Pharmacy (M.Pharm)',
           'Master of Architecture (M.Arch)', 'Master of Social Work (MSW)', 'Master of Science in Nursing (M.Sc. Nursing)',
           'Master of Public Health (MPH)', 'Master of Philosophy (M.Phil.)'],
    'ug':  'Bachelor of Medicine, Bachelor of Surgery (MBBS)'

}


def adti_exp_score(instance):
    all_exp = instance.exp.all()
    score = 0

    if instance.pg.filter(degree__in=adti_degree['pg']).exists() and instance.ug.degree == adti_degree['ug']:

        total = 0
        for each_exp in all_exp:
            total += each_exp.year

        score = total * 7

    return 20 if score >= 20 else score
