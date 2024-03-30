#include "userModule.h"
#include<bits/stdc++.h>
using namespace std;
#ifndef user_order
#define user_order
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

class order:public User{
protected:
  orderDescription orderDesc;
    designerDescription desgDesc ;
  paymentDetails  payInfo;
  string deliveryDate;
};

#endif

