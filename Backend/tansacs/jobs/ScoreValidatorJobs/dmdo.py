dmdo_degree = {
    1: {'pg': ['Public Health', 'Healthcare Management', 'Healthcare Administration', 'Applied Epidemiology']},
    3: {'ug': ['Medical or Allied Health Sciences'], 'pg': ['Social Science', 'Psychology', 'Statistics', 'Population Sciences']}
}

required_exp = 'HIV/AIDS'
exp_field = 'Public Health'


def dmdo_exp_score(instance):
    print(instance.ug, instance.pg.all)
    all_exp = instance.exp.all()

    score = 0
    print("all", all_exp)
    # Check if the user has the required experience
    if all_exp.filter(degree__icontains=required_exp, year__gte=1).exists():
        # Check if the user's undergraduate degree is in the specified list
        print("first_pass")
        if instance.ug.degree in dmdo_degree[3]['ug']:
            print("second pass")
            # Check if the user has any of the postgraduate degrees listed
            if instance.pg.filter(degree__in=dmdo_degree[3]['pg']).exists():
                print("third pass")
                # If all checks pass, calculate score (the calculation logic will depend on your requirements)
                # Assign a score based on your criteria
                total = 0
                for each_exp in all_exp:
                    if each_exp.degree != required_exp:
                        total += each_exp.year

                score = total * 7

    if instance.pg.filter(degree__in=dmdo_degree[1]['pg']).exists():
        print("fourth pass")
        total = 0
        for each_exp in all_exp:

            total += each_exp.year

        score = total * 20

    return 20 if score >= 20 else score
