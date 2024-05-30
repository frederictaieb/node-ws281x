import smtplib
import socket

def get_ip_address():
    try:
        # Crée une socket
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        # Essaie de se connecter à une adresse quelconque
        s.connect(("8.8.8.8", 80))
        # Récupère l'adresse IP de la socket
        ip_address = s.getsockname()[0]
        # Ferme la connexion
        s.close()
        return ip_address
    except socket.error:
        return "Impossible de récupérer l'adresse IP"


sender = 'frederic.taieb.rpi@gmail.com'
receivers = ['frederic.taieb@gmail.com']

message = """From: Frederic TAIEB <testing123@gmail.com>
To: Frederic TAIEB <testing@hotmail.com>
Subject: Led Server IP
""" + get_ip_address();

gmail_user = "frederic.taieb.rpi@gmail.com"
gmail_app_password = "oozi lwiv hhij mfjc"
sent_from = "frederic.taieb.rpi@gmail.com"
sent_to = "frederic.taieb@gmail.com"
email_text = message

try:
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.ehlo()
    server.login(gmail_user, gmail_app_password)
    server.sendmail(sent_from, sent_to, email_text)
    server.close()

    print('Email sent!')
except Exception as exception:
    print("Error: %s!\n\n" % exception)

