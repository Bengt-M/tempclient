# run this as root after npm run build

cd /var/www/html/
rm -rf temp/*
#mkdir temp
cd temp
cp -r /home/bengt/node-react-workspace/tempclient/build/* .
chown -R apache:apache .
restorecon -v .
