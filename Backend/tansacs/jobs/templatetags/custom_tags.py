
from django import template

register = template.Library()


@register.simple_tag
def get_experience(job):
    companies = {'NACO': 0, 'TANSACS': 0, 'TSU': 0}

    for exp in job.pexp.all():
        if exp.company in companies:
            companies[exp.company] = exp.year

    return companies
