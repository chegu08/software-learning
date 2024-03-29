#include<bits/stdc++.h>
using namespace std;

#ifndef UserModule
#define UserModule
class User{
    public:
    string name;

    protected:
    string mailID;
    string gender;
    string address;
    struct order;

    private:
    int phoneNumber;
    int age;
    string password;
    struct preference;
};

struct prefernce{
string gender;
int  age;
string size;
}
;


#endif