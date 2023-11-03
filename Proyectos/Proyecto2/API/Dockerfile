FROM python:alpine

WORKDIR /API

COPY . .

RUN apk add --no-cache gcc musl-dev linux-headers

RUN pip install --no-binary :all: psutil

RUN pip install -r requirements.txt

EXPOSE 4000

CMD ["python3", "main.py"]
