# Earthquake API

To run this simple Earthquake API you need `python`. It should available for all most
Linux distro. if not available you need to install it, or use any equivalent webserver
that can serve static content. The entry point is `index.html`

### Feature
- Clustering the earthquake marker
- using web worker to speed up the computation
- filter by date range and magnitude

#### Start the server
if your python is version 2. Run this command in the root directory
```
python -m SimpleHTTPServer 8080
```

python3 is using like this
```
python -m http.server 8080
```

That will serve our Earthquake API in port 8080. So open http://localhost:8080/
