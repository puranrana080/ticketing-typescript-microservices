## 🚀 Install NGINX Ingress Controller

To enable Ingress in your Kubernetes cluster, install the **NGINX Ingress Controller**.

### 🔹 Option: Install using YAML (No Helm required)

If you don’t have Helm or prefer a simple setup, run:
s

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.15.1/deploy/static/provider/cloud/deploy.yaml