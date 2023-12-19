### Ngrok Setup steps

1. Ngrok setup is implemented out of box in the boilerplate. To start using the feature, checkout in branch named `feature/CWM-3181-ngrok-support`.

2. Visit the link: https://dashboard.ngrok.com/get-started/your-authtoken

3. Register/Login with credentials used for ngrok setup for project.

4. Get your ngrok authtoken from dashboard.

5. Create and add a env variable `NGROK_AUTH_TOKEN` with appropriate authtoken value copied from ngrok dashboard.

6. Set env variable `ENABLE_TUNNEL` to true to enable tunnel support for remote testing.


### How to use it ?

```Shell
npm run start:tunnel
```

This command will start a server and tunnel it with `ngrok`. You'll get a URL
that looks a bit like this: `https://ac04-123-136-209-134.ngrok-free.app`

This URL will show the version of your application that's in the `build` folder,
and it's accessible from the entire world! This is great for testing on different
devices and from different locations!
