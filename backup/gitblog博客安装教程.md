# 新建一个仓库gitblog

## 新建仓库G_KEY

### a. 新生成一个[github token](https://github.com/settings/tokens)，
New personal access token (classic)
scope勾选： repo、workflow、gist、user，
生成后复制到一个安全的地方存储后面备用；
### b. 配置[Repository secrets](https://github.com/humyna/gitblog/settings/secrets/actions)
settings-->secrets and variables-->Actions-->new repository secrets,名称为G_KEY,值就是上面的github token

> 注意：这个G_KEY会在后面的gene_readme.yml文件中使用

------
下载yihong0618开源的[这个项目](https://github.com/yihong0618/gitblog)，将其中除了feed.xml的文件全部copy到第一步项目中。
a. BACKUP中只保留.gitkeep空文件，
b. 修改gene_readme.yml文件，L11中分支名由master改成main;前面的G_KEY在这个文件配置(secrets.G_KEY)。
c. 修改main.py文件，搜索master,改成main
4.修改[workflow permissions](https://github.com/humyna/gitblog/settings/actions)
![image](https://github.com/user-attachments/assets/7123d98b-ed94-4d2f-a4bd-4be9fed90701)

如果不修改，在提交issue后，github actions执行报错
![image](https://github.com/user-attachments/assets/f8baf3ea-22ca-4571-8007-f12d06f84fbc)

5.初始化一些[labels](https://github.com/humyna/gitblog/labels)

至此基于issues个人博客就搭建完成了，可以愉快地写作了。

注意：提交issues，选择lable，github actions会被触发执行。