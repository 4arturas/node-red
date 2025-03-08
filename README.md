```bash
docker build -t mynodered .
````
```bash
docker tag mynodered mynodered
````
```bash
docker run -it -p 1880:1880 --name mynodered mynodered
````
```bash
docker exec -it mynodered /bin/bash
````

```bash
docker build -t mynodered . && docker tag mynodered mynodered && docker run -it -p 1880:1880 --name mynodered mynodered
````

```bash
docker rmi mynodered --force
````
```bash
docker rm mynodered --force
````
```bash
curl http://127.0.0.1:1880/test?id=333
````

# Push image do github
```bash
docker build -f Dockerfile -t mynodered .
docker tag mynodered ghcr.io/4arturas/mynodered
export CR_PAT=token...fvkK9lhxJGOPBm...token
echo $CR_PAT | docker login ghcr.io -u 4arturas --password-stdin
docker push ghcr.io/4arturas/mynodered
````

# Push image do docker hub
```bash
docker build -f Dockerfile -t mynodered . && \
docker tag mynodered arturix/mynodered && \
docker push arturix/mynodered
````

# Setup
## Get IP
```bash
kubectl get -n kube-system service/traefik -o jsonpath="{.status.loadBalancer.ingress[0].ip}"
````
```bash
sudo bash -c 'echo -n ''172.18.0.2    mynodered.sys'' >> /etc/hosts'
````

# k8s
```bash
kubectl apply -f argocd/k8s.yaml
````
```bash
kubectl delete -f argocd/k8s.yaml
````
```bash
curl http://mynodered.sys/test?id=333
````
http://mynodered.sys


# Skaffold
```bash
skaffold dev --port-forward
````
http://127.0.0.1:8888/

# ArgoCD

```sh
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
````

```sh
kubectl port-forward svc/argocd-server -n argocd 8080:443
````

https://flows.nodered.org/node/node-red-contrib-image-tools
npm install node-red-contrib-ui-media
