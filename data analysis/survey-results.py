import csv
import json

'''
transform survey data from json format to csv (delimiter is tab)
'''


csvfile = open('results/survey_results.csv', 'w', newline='')
csvwriter = csv.writer(csvfile, delimiter='\t')

for index, survey in enumerate(json.load(open('raw_data/survey_results.json', 'r'))):
    if index == 1:
        header = ['user id', 'channel id']
        header.extend(['pre survey ('+item['name']+')' if 'name' in item.keys() else ' ' for item in survey['pre_survey']])
        header.extend(['post survey ('+item['name']+')' if 'name' in item.keys() else ' ' for item in survey['post_survey']])
        csvwriter.writerow(header)
    elif index > 1:
        row = [survey['user'] if 'user' in survey.keys() else ' ',
               survey['channel'] if 'channel' in survey.keys() else ' ']
        if survey['pre_survey']:
            row.extend([item['answer'] if 'answer' in item.keys() else ' ' for item in survey['pre_survey']])
        if survey['post_survey']:
            row.extend([item['answer'] if 'answer' in item.keys() else ' ' for item in survey['post_survey']])
        csvwriter.writerow(row)


csvfile.close()
print('Done.\n')
