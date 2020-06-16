

# Tax Protocol Example

A reference app implementing a VTEX IO Tax Protocol service.

- Start from `node/index.ts` and follow the comments and imports :)

## Recipes

### Defining routes on _service.json_ 
```json
{
  "memory": 256,
  "ttl": 10,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 4,
  "routes": {
    "status": {
      "path": "/_v/status/:code",
      "public": true
    }
  }
}
```

The `service.json` file that sits on the root of the `node` folder holds informations about this service, like the maximum timeout and number of replicas, what might be discontinued on the future, but also **sets its routes**. 

### Throwing errors

When building a HTTP service, we should follow HTTP rules regarding data types, cache, authorization, and status code. Our example app sets a `ctx.status` value that will be used as a HTTP status code return value, but often we also want to give proper information about errors as well.

The **node-vtex-api** already exports a handful of **custom error classes** that can be used for that purpose, like the `NotFoundError`. You just need to throw them inside one of the the route handlers that the appropriate response will be sent to the server.

```typescript
import { UserInputError } from '@vtex/api'

export async function validate(ctx: Context, next: () => Promise<any>) {
  const { code } = ctx.vtex.route.params
  if (isNaN(code) || code < 100 || code > 600) {
    throw new UserInputError('Code must be a number between 100 and 600')
  }
...
```

You can check all the available errors [here](https://github.com/vtex/node-vtex-api/tree/fd6139349de4e68825b1074f1959dd8d0c8f4d5b/src/errors), but some are not useful for just-HTTP services. Check the most useful ones:

|Error Class | HTTP Code |
|--|:--:|
| `UserInputError` | 400 |
| `AuthenticationError` | 401 |
| `ForbiddenError` | 403 |
| `NotFoundError` | 404 |

You can also **create your custom error**, just see how it's done above ;)

### Reading a JSON body

When writing POST or PUT handlers, for example, often you need to have access to the **request body** that comes as a JSON format, which is not provided directly by the handler function.

For this, you have to use the [co-body](https://www.npmjs.com/package/co-body) package that will parse the request into a readable JSON object, used as below: 
```typescript
import { json } from 'co-body'
export async function method(ctx: Context, next: () => Promise<any>) {
    const body = await json(ctx.req)
```

### Other example apps

We use Node services across all VTEX, and there are a lot inspiring examples. If you want to dive deeper on learning about this subject, don't miss those internal apps: [builder-hub](https://github.com/vtex/builder-hub) or [store-sitemap](https://github.com/vtex-apps/store-sitemap)
