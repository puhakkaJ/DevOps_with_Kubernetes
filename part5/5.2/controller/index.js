const k8s = require('@kubernetes/client-node')
const JSONStream = require('json-stream')
const request = require('request')

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

// https://github.com/kubernetes-hy/material-example/tree/master/app10
const opts = {};
kc.applyToRequest(opts);

console.log(kc)

const sendRequest = async (api, method = 'get', options = {}) => new Promise((resolve, reject) => request[method](`${kc.getCurrentCluster().server}${api}`, {...opts, ...options, headers: { ...options.headers, ...opts.headers }}, (err, res) => err ? reject(err) : resolve(JSON.parse(res.body))))

//init Api
const k8sApi = kc.makeApiClient(k8s.CoreV1Api)
const k8sNetworkingApi = kc.makeApiClient(k8s.NetworkingV1beta1Api)
const k8sDeploymentApi = kc.makeApiClient(k8s.AppsV1Api)

//watch dummy
function init_dummy() {
    const stream = new JSONStream()
    siteStream.on('data', async ({ type, object }) => {
        console.log(object)
        if (type === 'ADDED') {
            const fields = {
                url: object.spec.url,
                name: object.metadata.name,
                namespace: object.metadata.namespace || 'default',
                image: object.spec.image
            }
            try {
                if (await NoService(fields)) createService(fields)
                if (await NoIngress(fields)) createIngress(fields)    
                if (await NoDeployment(fields)) createDeployment(fields)  
            } catch (error) {
                console.log(JSON.stringify(error))
            }
        }
    })
    request.get(`${kc.getCurrentCluster().server}/apis/stable.dwk/v1/dummysites?watch=true`, opts).pipe(stream)
}

//helpper functions to check availability
const NoService = async (dummyobj) => {
    const { namespace } = dummyobj
    const { items } = await sendRequest(`/apis/batch/v1/namespaces/${namespace}/services`)
    if (!items) { return true } else return (items.find(item => item.metadata.name === `${dummyobj.name}-svc`)).lenght == 0  ? true : false 
}

const NoIngress = async (dummyobj) => {
    const { name, namespace } = dummyobj
    const { items } = await sendRequest(`/apis/batch/v1/namespaces/${namespace}/ingresses`)
    if (!items) { return true } else return (items.find(item => item.metadata.name === `${name}-ing`)).lenght == 0  ? true : false 
}
  
const NoDeployment = async (dummyobj) => {
    const { name, namespace } = dummyobj
    const { items } = await sendRequest(`/apis/batch/v1/namespaces/${namespace}/deployments`)
    if (!items) { return true } else return (items.find(item => item.metadata.name === name)).lenght == 0  ? true : false 
}

//helpper function to create
async function createService(dummyobj) {
    await k8sApi.createNamespacedService(dummyobj.namespace, {
        apiVersions: 'v1',
        kind: 'Service',
        metadata: {
            name: `${dummyobj.name}-svc`,
        },
        spec: {
            type: 'ClusterIP',
            selector: {
                app: dummyobj.name,
            },
            ports: [{
                port: 2345,
                protocol: 'TCP',
                targetPort: 3000,
            }]
        }
    }).catch(error => console.log(error))
}

async function createIngress(dummyobj) {
    await k8sNetworkingApi.createNamespacedIngress(dummyobj.namespace, {
        apiVersion: 'networking.k8s.io/v1beta1',
        kind: 'Ingress',
        metadata: {
            name: `${dummyobj.name}-ingress`,
        },
        spec: {
            rules: [{
                http: {
                    paths: [{
                        backend: {
                            serviceName: `${dummyobj.name}-svc`,
                            servicePort: 2345
                        },
                        path: '/',
                    }]
                }
            }]
        }
    }).catch(error => console.log(error))
}

async function createDeployment(dummyobj) {
    await k8sDeploymentApi.createNamespacedDeployment(dummyobj.namespace, {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
            name: `${dummyobj.name}-dep`,
            namespace: `${dummyobj.name}`
        },
        spec: {
            selector: {
                matchLabels: {
                    app: dummyobj.name
                }
            },
            template: {
                metadata: {
                    labels: {
                        app: dummyobj.name
                    }
                },
                spec: {
                    containers: [{
                        name: 'dummysite-app',
                        image: `${dummyobj.image}`,
                        env: [{
                            name: 'WEBSITE_URL',
                            value: dummyobj.url
                        }]
                    }]
                }
            }
        }
    })
}

init_dummy()