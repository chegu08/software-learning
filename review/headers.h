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


class db{
    public:
    //inserting the created users
    vector<User> allUsers;
    void insertuser(User& new_user);

    //inserting the created designers
    vector<designer> allDesigners;
    void insertDesigner(designer& new_designer);

    //insert an order into the correct vector of user orders
    vector<vector<userorder>> alluserOrders;
    void insertuserorder(int,userorder);

    //insert an order into the correct vector of designer orders
    //The class designerorder is not yet formed
    vector<vector<designerorder>> alldesignerOrders;
    void insertdesignerorder(int,designerorder);

    //insert a product into vector of user carts
    vector<vector<string>> alluserCarts;
    void insertintocart(int,string);

    friend user_home;
    friend designer_home;
    friend userorder;
    friend designer;

};
extern db user_obj,designer_obj;

class Login_Account:public db{
    private: 
        int check_user_details(string name,string password);
        int check_designer_details(string name,string password);
        int findUserID(string name);
        int get_designer_Id(string,string);
    public:
        Login_Account();
        //friend user_home;
        //friend designer_home;
};


class Create_Account:public db{
    public:
    Create_Account();
    int choice;
    void Create_User();
    void Create_designer();
};

#endif
