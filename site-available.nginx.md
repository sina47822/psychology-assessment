upstream nextjs_teenapp {
    server 127.0.0.1:9004;
}

server {
    server_name teenapp.ir www.teenapp.ir;
    listen 80;
    return 404; # managed by Certbot
    
    location / {
        proxy_pass http://nextjs_teenapp;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}