import pymysql

try:
    connection = pymysql.connect(
        host="localhost",
        port=3306,
        user="root",
        password="gulbano123",
        database="smart_service"
    )

    print("✅ Connected successfully!")

    connection.close()

except Exception as e:
    print(e)