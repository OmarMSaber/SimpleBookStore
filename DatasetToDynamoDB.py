import boto3
import csv

def main():
    region='us-east-1'
    recList=[]
    try:
        s3=boto3.client('s3')
        dyndb = boto3.client('dynamodb', region_name=region)
        confile= s3.get_object(Bucket='test-bucket-for-csv', Key='books.csv')
        recList = confile['Body'].read().split('\n')
        firstrecord=True
        csv_reader = csv.reader(recList, delimiter=',', quotechar='"')
        for row in csv_reader:
            print(row)
            if (firstrecord):
                firstrecord=False
                continue
            bookID = row[0]
            title = row[1]
            authors = row[2]
            average_rating = row[3]
            isbn = row[4]
            isbn13 = row[5]
            language_code = row[6]
            num_pages = row[7]
            ratings_count = row[8]
            text_reviews_count = row[9]
            publication_date = row[10]
            publisher = row[11]
            response = dyndb.put_item(
                TableName='Books',
                Item={
                'bookID' : {'N':str(bookID)},
                'title': {'S':title},
                'authors': {'S':authors},
                'average_rating' : {'N':str(average_rating)},
                'isbn': {'S':isbn},
                'isbn13': {'S':isbn13},
                'language_code' : {'S':language_code},
                'text_reviews_count': {'N':text_reviews_count},
                'ratings_count': {'N':ratings_count},
                'num_pages' : {'N':str(num_pages)},
                'publication_date': {'S':publication_date},
                'publisher': {'S':publisher},
                }

            )
        print('Put succeeded:')
    except Exception, e:
        print (str(e))

main()
