FROM python:alpine

WORKDIR /API

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 3000

CMD ["python3", "main.py"]