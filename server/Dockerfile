FROM python:3.11.4

ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED=1

RUN apt-get update -q && apt-get install -yq libpq-dev

WORKDIR /app 

COPY requirements.txt requirements.txt


RUN pip3 install -r requirements.txt



COPY . .