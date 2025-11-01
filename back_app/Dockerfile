FROM python
WORKDIR /app
COPY req.txt ./req.txt
RUN pip install --no-cache-dir -r req.txt
COPY . .
CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080" ]