#include<bits/stdc++.h>
using namespace std;
#ifndef UserModule
#define UserModule
class start_page;
class Create_Account;
class Login_Account;
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

class User{

    public:
    string name;

    protected:
    string mailID;
    string gender;
    string address;
    //order UserOrder;
    long long  phoneNumber;
    int age;
    string password;
    preference* Userpreference;

    // public:
    // User(string Name,string Mail,string Gender,string Address,long long pn,int Age,string pw,preference *pre){
    //   name=Name;
    //   mailID=Mail;
    //   gender=Gender;
    //   address=Address;
    //   phoneNumber=pn;
    //   age=Age;
    //   password=pw;
    //   Userpreference=pre;

    // }
    friend Create_Account;

};




#endif
