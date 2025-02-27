 1、打开谷歌云：
```md
https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fconsole.cloud.google.com%2F&followup=https%3A%2F%2Fconsole.cloud.google.com%2F&ifkv=AeZLP9-0IQSq05xeTMuW_HTDcW960bBquuu4bZzNRa3Y1JiTKCW9rsteltb7DqePmwSSYv987u3_oA&osid=1&passive=1209600&service=cloudconsole&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-550021044%3A1734529949831903&ddm=1
```


2. 点击右上角的“激活Cloud Shell”

![Image](https://github.com/user-attachments/assets/8b0e4d23-9383-431b-b007-f9b1e34b4cb7)

3、下方终端会打开：

![Image](https://github.com/user-attachments/assets/70b8d04c-a3f4-485e-844e-b417a4cb52ac)



4、我们不需要申请任何vps，它只临时运行大约15-30分钟左右就关闭了
输入命令：
docker run -p 8080:80 dorowu/ubuntu-desktop-lxde-vnc
5、等命令运行完打开终端右上的“网页预览”，会弹出如下界面，然后点击左下角，选择Ineernet-Firefox Web Brower

![Image](https://github.com/user-attachments/assets/fea652e7-0ff6-4d2d-9658-960a89c46448)




这火狐浏览器中，打开serv00的注册页面，多刷新几次，就可以注册成功了