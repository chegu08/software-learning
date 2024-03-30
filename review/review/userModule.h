#include<bits/stdc++.h>
using namespace std;
#ifndef UserModule
#define UserModule


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
    int id;
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
};




#endif
