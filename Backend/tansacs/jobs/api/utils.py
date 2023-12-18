

def get_list_dict(validated_data, course, key=''):
    pg_data = []
    pgval = 0
    while True:

        data = {k.replace(f'{course}[{pgval}][', '').replace(
            ']', ''): v for k, v in validated_data.items() if k.startswith(f'{course}[{pgval}][')}

        # if course == "prefered_experience" and 'NOC' in data:
        #     if data['NOC'] == '':
        #         data.pop('NOC', None)

        are_all_keys_empty = all(value == '' for value in data.values())

        if len(data) <= 0:
            break

        if key and not data[key]:
            break
        if not are_all_keys_empty:
            pg_data.append(data)
        pgval += 1
    return pg_data
