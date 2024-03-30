#include<bits/stdc++.h>
using namespace std;
#ifndef DesignerModule
#define DesignerModule
class Create_Account;
class Login_Account;
class designer{
    public:
    string name;
    string mailID;
    protected:
    int age;
    int id;
    string gender;
    string address;
    long long contactNumber;
    string password;
    
  friend Create_Account;
  friend Login_Account;
};

#endif