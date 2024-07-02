git clone -b beforescatter https://github.com/Bengt-M/tempclient.git
cd tempclient
npm install
npm run build

# run the rest as root
sudo -i

cd /var/www/html/temp
rm -rf *
cp -r /home/bengt/node-react-workspace/tempclient/build/* .
chown -R apache:apache .
restorecon -Rv .
