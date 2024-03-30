#include "designerModule.h"
#include "userModule.h"
#ifndef START_PAGE
#define START_PAGE
extern int userCount,designerCount;

class start_page{
    public:
    int flag;
    start_page();
};
 class Create_Account{
    public:
    Create_Account();
    int choice;
    void Create_User();
    void Create_designer();
};
class db{
    public:
    vector<User> allUsers;
    void insertuser(User& new_user);
    vector<designer> allDesigners;
    void insertDesigner(designer& new_designer);
};
extern db user_obj,designer_obj;
class Login_Account:public db{
    private: 
    int check_user_details(string name,string password);
    int check_designer_details(string name,string password);
    public:
    Login_Account();
};

#endif
