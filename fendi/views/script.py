import os



# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'ACa41535c5a5d12d68295807683097d619'
auth_token = '9c59e19fdc7c37df2d410d99d8dc4a3d'
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Potential threat of sexual assault.",
                     from_='+15017122661',
                     to='+14752455633'
                 )

print(message.sid)
