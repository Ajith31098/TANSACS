

def get_list_dict(validated_data,course ,key=''):
    pg_data = []
    pgval = 0
    while True:

        data = {k.replace(f'{course}[{pgval}][', '').replace(']', ''): v for k, v in validated_data.items() if k.startswith(f'{course}[{pgval}][')}
        
        if course == "prefered_experience" and 'NOC' in data:
            if data['NOC'] == '':
                data.pop('NOC', None)
            

        if len(data) <= 0:
            break

        if key and not data[key]:
            break
        
        pg_data.append(data)
        pgval +=1
    return pg_data