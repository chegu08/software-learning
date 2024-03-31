
#include<bits/stdc++.h>
using namespace std;
#ifndef UserModule
#define UserModule

class start_page;
class Create_Account;
class Login_Account;
class db;
class designer_home;
class designerorder;
class User;
//inline string createdate(string);
struct user_paymentDetails{
    int  amount;
    long long paymentID;
};

struct orderDescription{
    int orderId;
    string orderDate;
    int noOfItems;
    string productDescription,orderstatus;
    orderDescription(int OId,int No_items,string ODate,string Pro_des,string status){
        orderId=OId;
        noOfItems=No_items;
        orderDate=ODate;
        productDescription=Pro_des;
        orderstatus=status;
    }
};

struct designerDescription{
    long long contactDetail;
    string name;
    int id;//id is designer's id
    designerDescription(long long phnum,string des_name,int a){
        contactDetail=phnum;
        name=des_name;
        id=a;
    }
};

struct preference{
    string gender;
    int  age;
    string size;
    string  color;
    preference(string p_gender,int p_age,string p_size,string p_color){
        age=p_age;
        gender=p_gender;
        size=p_size;
        color=p_color;
    }
};

class user_home{
    protected:
        void updateorderstastus(User);
        void create_product(User);
        void addtocart(User,string);
        void placeorder(User,string);
        void see_orders(User);
        void see_cart(User);
        void editprofile(User);
        void cancelproduct(User,int,int);
        void pay(User,int);

    public:
        void request_designer(User,designer des,string description,int n);
        void seeProfile(User);
        designer& display_designers();

    user_home(int);
    friend Login_Account;
    friend designer_home;
};

class userorder{
    protected:
        orderDescription* orderDesc;
        designerDescription* desgDesc ;
        user_paymentDetails  payInfo;
        string shipmentDate;
    friend user_home;
    friend designer_home;
};

class User{

    public:
        string name;

    protected:
        string mailID;
        string gender;
        string address;
        long long phoneNumber;
        int age;
        string password;
        preference* Userpreference;
        int id;

    friend Create_Account;
    friend Login_Account;
    friend userorder;
    friend user_home;
};






#endif