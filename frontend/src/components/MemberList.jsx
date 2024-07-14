
import { User, Briefcase, CheckCircle, Clock } from 'lucide-react';
import { Card } from "@/components/ui/card"

const MemberList = ({ team }) => {
    console.log("team in: ", team);
  return (
    <Card className="m-6">
      <p className="text-green-600 font-bold text-center" >Team Members</p>
      <Card className="mt-4">
        {team.map(member => (
          <div key={member.user_id} className="p-4 border-b last:border-b-0">
            <Card className="grid grid-cols-3">
              <div >
                <User className="mr-2" />
                <p>Name: {member.user.name}</p>
              </div>
              <div align="center" className="mt-2">
                <Briefcase className="mr-2" />
                <p>Role: {member.role}</p>
              </div>
              <div align="center" className="mt-2">
                {member.status === 'approved' ? (
                  <>
                    <CheckCircle className="mr-2 text-green-500" />
                    <p>Status: Joined</p>
                  </>
                ) : (
                  <>
                    <Clock className="mr-2 text-yellow-500" />
                    <p>Status: Pending</p>
                  </>
                )}
              </div>
            </Card>
          </div>
        ))}
      </Card>
    </Card>
  );
};

export default MemberList;
