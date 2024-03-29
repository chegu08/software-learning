#include<bits/stdc++.h>
using namespace std;
#ifndef UserModule
#define UserModule
struct paymentDetails{
int  amount;
long long paymentID;
};

struct orderDescription{
 int orderId;
 string orderDate;
 int noOfItems;
 string productDescription;
};

struct designerDescription{
long long contactDetail;
string name;
string rating;
};

class order:protected User{
protected:
  orderDescription orderDesc;
   designerDescription desgDesc ;
  paymentDetails  payInfo;
  string deliveryDate;
};

class User{
    public:
    string name;
    protected:
    string mailID;
    string gender;
    string address;
       //order UserOrder;
     int phoneNumber;
    int age;
    string password;
    struct preference;
};

struct prefernce{
string gender;
int  age;
string size;
string  color;
}
;
#endif
