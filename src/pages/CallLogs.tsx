
import { useState, useRef } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Phone, Clock, Play, Pause, DownloadCloud, FileText, Mic, MicOff, SkipBack, SkipForward } from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// Mock data for call logs
const callLogsData = [
  {
    id: "CALL-1234",
    prospect: "Alex Johnson",
    prospectPhone: "+1 (555) 123-4567",
    duration: "5m 23s",
    durationSeconds: 323,
    status: "completed",
    result: "interested",
    timestamp: "Today, 14:35",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording1.mp3"
  },
  {
    id: "CALL-1235",
    prospect: "Morgan Smith",
    prospectPhone: "+1 (555) 234-5678",
    duration: "2m 45s",
    durationSeconds: 165,
    status: "completed",
    result: "not interested",
    timestamp: "Today, 13:12",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording2.mp3"
  },
  {
    id: "CALL-1236",
    prospect: "Jamie Rodriguez",
    prospectPhone: "+1 (555) 345-6789",
    duration: "8m 18s",
    durationSeconds: 498,
    status: "completed",
    result: "callback",
    timestamp: "Today, 11:50",
    hasRecording: true,
    hasTranscript: true,
    recordingUrl: "https://example.com/recording3.mp3"
  },
  {
    id: "CALL-1237",
    prospect: "Taylor Chen",
    prospectPhone: "+1 (555) 456-7890",
    duration: "1m 12s",
    durationSeconds: 72,
    status: "no-answer",
    result: "voicemail",
    timestamp: "Today, 10:27",
    hasRecording: false,
    hasTranscript: false
  },
  {
    id: "CALL-1238",
    prospect: "Casey Brown",
    prospectPhone: "+1 (555) 567-8901",
    duration: "4m 55s",
    status: "completed",
    result: "interested",
    timestamp: "Yesterday, 16:45",
    hasRecording: true,
    hasTranscript: true
  },
  {
    id: "CALL-1239",
    prospect: "Jordan Wallace",
    prospectPhone: "+1 (555) 678-9012",
    duration: "0m 35s",
    status: "failed",
    result: "technical-issues",
    timestamp: "Yesterday, 14:22",
    hasRecording: false,
    hasTranscript: false
  },
  {
    id: "CALL-1240",
    prospect: "Riley Patel",
    prospectPhone: "+1 (555) 789-0123",
    duration: "6m 38s",
    status: "completed",
    result: "callback",
    timestamp: "Yesterday, 11:15",
    hasRecording: true,
    hasTranscript: true
  },
  {
    id: "CALL-1241",
    prospect: "Quinn Kim",
    prospectPhone: "+1 (555) 890-1234",
    duration: "7m 20s",
    status: "completed",
    result: "interested",
    timestamp: "2 days ago, 15:30",
    hasRecording: true,
    hasTranscript: true
  }
];

// Mock transcript data
const mockTranscript = `
Agent: Hello, this is Alex from Sales Dashboard. How are you doing today?

Prospect: I'm doing fine, thanks for asking. What's this call about?

Agent: I'm calling to introduce you to our new analytics platform that helps sales teams track and improve their performance. Based on your company profile, I thought this might be something you're interested in.

Prospect: Actually, we are looking to improve our sales analytics. What makes your platform different?

Agent: Great question! Our platform integrates with your existing CRM and provides real-time insights with AI-powered recommendations. We've seen customers improve their conversion rates by 27% on average within the first three months.

Prospect: That sounds promising. Do you have a demo I could see?

Agent: Absolutely! I'd be happy to schedule a demo for you. Would later this week work for you?

Prospect: Yes, Thursday afternoon would be ideal.

Agent: Perfect! I'll send you a calendar invite for Thursday at 2 PM. Is there anyone else from your team who should join?

Prospect: Yes, I'll include our head of sales in the meeting.

Agent: Sounds good. I'll send over some materials ahead of time so you can get a better idea of what we'll cover. Thank you for your time today!

Prospect: Thank you, looking forward to the demo.
`;

const CallLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isViewingTranscript, setIsViewingTranscript] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState("");
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [isAudioDialogOpen, setIsAudioDialogOpen] = useState(false);
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [selectedCall, setSelectedCall] = useState(null);
  const audioRef = useRef(null);
  
  // Filter calls based on search term and tab
  const filteredCalls = callLogsData.filter(call => {
    const matchesSearch = 
      call.prospect.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.prospectPhone.includes(searchTerm) ||
      call.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (selectedTab === "all") return matchesSearch;
    return matchesSearch && call.status === selectedTab;
  });
  
  const getStatusColor = (status) => {
    switch(status) {
      case "completed": return "bg-green-100 text-green-800";
      case "no-answer": return "bg-amber-100 text-amber-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getResultColor = (result) => {
    switch(result) {
      case "interested": return "bg-green-100 text-green-800";
      case "not interested": return "bg-red-100 text-red-800";
      case "callback": return "bg-blue-100 text-blue-800";
      case "voicemail": return "bg-purple-100 text-purple-800";
      case "technical-issues": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handlePlayRecording = (call) => {
    setSelectedCall(call);
    setIsAudioDialogOpen(true);
    
    // In a real implementation, this would load the actual audio file
    setTimeout(() => {
      if (audioRef.current) {
        setAudioDuration(call.durationSeconds);
      }
    }, 500);
  };
  
  const togglePlayPause = () => {
    setIsPlayingRecording(!isPlayingRecording);
    
    // In a real implementation, this would play/pause the audio
    if (isPlayingRecording) {
      // Pause logic
      clearInterval(window.audioInterval);
    } else {
      // Play logic - simulating audio playback
      window.audioInterval = setInterval(() => {
        setCurrentAudioTime((prev) => {
          if (prev >= audioDuration) {
            clearInterval(window.audioInterval);
            setIsPlayingRecording(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };
  
  const handleAudioSeek = (value) => {
    setCurrentAudioTime(value[0]);
    // In a real implementation, this would seek the audio to the specified time
  };
  
  const handleDialogClose = () => {
    if (isPlayingRecording) {
      clearInterval(window.audioInterval);
      setIsPlayingRecording(false);
    }
    setCurrentAudioTime(0);
    setIsAudioDialogOpen(false);
  };
  
  const handleDownloadRecording = (callId) => {
    // In a real app, this would download the recording from Vapi
    toast.success(`Downloading recording for call ${callId}`);
  };
  
  const handleViewTranscript = (callId) => {
    setSelectedCallId(callId);
    setIsViewingTranscript(true);
  };
  
  return (
    <div className="py-6 px-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Call Logs</h1>
        <p className="text-gray-500">View and analyze all your prospect calls made through Vapi</p>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>All Calls</CardTitle>
              <CardDescription>A complete log of all calls to your prospects</CardDescription>
            </div>
            <Tabs 
              defaultValue="all" 
              className="w-full md:w-auto"
              value={selectedTab}
              onValueChange={setSelectedTab}
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="no-answer">No Answer</TabsTrigger>
                <TabsTrigger value="failed">Failed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search call logs..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filters</span>
            </Button>
            <Button className="flex items-center gap-2">
              <Phone size={16} />
              <span>New Call</span>
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Prospect</TableHead>
                  <TableHead className="hidden md:table-cell">Duration</TableHead>
                  <TableHead className="hidden lg:table-cell">Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Result</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">{call.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{call.prospect}</div>
                        <div className="text-sm text-gray-500">{call.prospectPhone}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1 text-gray-500" />
                        {call.duration}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{call.timestamp}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(call.status)}>
                        {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge className={getResultColor(call.result)}>
                        {call.result.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {call.hasRecording && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handlePlayRecording(call)}
                              title="Play Recording"
                            >
                              <Play size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDownloadRecording(call.id)}
                              title="Download Recording"
                            >
                              <DownloadCloud size={16} />
                            </Button>
                          </>
                        )}
                        {call.hasTranscript && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewTranscript(call.id)}
                            title="View Transcript"
                          >
                            <FileText size={16} />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Transcript Dialog */}
      <Dialog open={isViewingTranscript} onOpenChange={setIsViewingTranscript}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Call Transcript - {selectedCallId}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 p-4 bg-gray-50 rounded-md whitespace-pre-wrap font-mono text-sm">
            {mockTranscript}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewingTranscript(false)}>Close</Button>
            <Button className="ml-2">
              <DownloadCloud size={16} className="mr-2" />
              Download Transcript
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Audio Player Dialog */}
      <Dialog open={isAudioDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Call Recording</DialogTitle>
          </DialogHeader>
          
          {selectedCall && (
            <div className="space-y-4">
              <div>
                <div className="font-medium">{selectedCall.prospect}</div>
                <div className="text-sm text-gray-500">{selectedCall.prospectPhone}</div>
                <div className="text-sm text-gray-500">{selectedCall.timestamp} • {selectedCall.duration}</div>
              </div>
              
              <div className="bg-gray-50 rounded-md p-4">
                <audio ref={audioRef} className="hidden">
                  <source src={selectedCall.recordingUrl} type="audio/mp3" />
                </audio>
                
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentAudioTime(Math.max(0, currentAudioTime - 10))}
                    disabled={currentAudioTime <= 0}
                  >
                    <SkipBack size={16} />
                  </Button>
                  
                  <Button 
                    className={`h-12 w-12 rounded-full ${isPlayingRecording ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                    onClick={togglePlayPause}
                  >
                    {isPlayingRecording ? <Pause size={20} /> : <Play size={20} />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentAudioTime(Math.min(audioDuration, currentAudioTime + 10))}
                    disabled={currentAudioTime >= audioDuration}
                  >
                    <SkipForward size={16} />
                  </Button>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{formatTime(currentAudioTime)}</span>
                    <span>{formatTime(audioDuration)}</span>
                  </div>
                  <Slider
                    value={[currentAudioTime]}
                    max={audioDuration}
                    step={1}
                    onValueChange={handleAudioSeek}
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button variant="outline" className="flex items-center gap-2" onClick={() => handleViewTranscript(selectedCall.id)}>
                  <FileText size={16} />
                  <span>View Transcript</span>
                </Button>
                
                <Button className="flex items-center gap-2" onClick={() => handleDownloadRecording(selectedCall.id)}>
                  <DownloadCloud size={16} />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CallLogs;
